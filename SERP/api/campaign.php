<?php
header("Access-Control-Allow-Origin: http://localhost:3000");  
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function get_search_results_links($keyword) {
    $query = urlencode($keyword);
    $url = "https://www.google.com/search?q=$query&num=20";

    // Send user-agent header to avoid bot blocking
    $opts = [
        "http" => [
            "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n"
        ]
    ];
    $context = stream_context_create($opts);

    $html = file_get_contents($url, false, $context);

    if (!$html) return [];

    // Use regex to extract href links from search results
    preg_match_all('/<a href="\/url\?q=([^&"]+)/', $html, $matches);

    // Clean links and filter out unwanted links (google internal etc)
    $links = [];
    foreach ($matches[1] as $link) {
        if (strpos($link, 'google.com') === false) {
            $links[] = $link;
        }
    }
    return $links;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $campaignName = $data["campaignName"] ?? "Unnamed";
    $keywords = $data["keywords"] ?? [];
    $domainName = $data["domainName"] ?? "";
    $searchEngine = $data["searchEngine"] ?? "";

    // Save campaign info (optional)
    $entry = "$campaignName | ".implode(",",$keywords)." | $domainName | $searchEngine\n";
    file_put_contents("campaigns.txt", $entry, FILE_APPEND);

    // For demo, only support Google search here:
    if (strtolower($searchEngine) !== 'google') {
        echo json_encode([
            "message" => "✅ Campaign saved successfully, but only Google supported for URL fetch",
            "previousDomainUrl" => null,
            "domainUrl" => null
        ]);
        exit;
    }

    // Get links from Google search results of first keyword
    if (count($keywords) === 0) {
        echo json_encode([
            "error" => "No keywords provided"
        ]);
        exit;
    }

    $links = get_search_results_links($keywords[0]);

    // Find target domain position
    $targetIndex = -1;
    $targetUrl = null;
    $prevUrl = null;

    foreach ($links as $i => $link) {
        if (strpos($link, $domainName) !== false) {
            $targetIndex = $i;
            $targetUrl = $link;
            if ($i > 0) {
                $prevUrl = $links[$i - 1];
            }
            break;
        }
    }

    echo json_encode([
        "message" => "✅ Campaign saved successfully",
        "previousDomainUrl" => $prevUrl,
        "domainUrl" => $targetUrl
    ]);
    exit;
} elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode(["message" => "Send POST request with campaign data"]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
