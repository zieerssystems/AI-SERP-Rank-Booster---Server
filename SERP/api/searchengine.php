<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['search_engine'], $input['keywords'], $input['domain_name'])) {
    echo json_encode(['success' => false, 'message' => 'Missing parameters']);
    exit;
}

$search_engine = strtolower($input['search_engine']);
$keywords = is_array($input['keywords']) ? implode(' ', $input['keywords']) : $input['keywords'];
$domain_name = strtolower(trim($input['domain_name']));
$normalized_domain = parse_url("http://$domain_name", PHP_URL_HOST);

$serpApiKey = "b564a9e38e8cdf143798e0a8b2900b867820b6129c700090afef8e310dc57859";

$engineMap = [
    'google' => ['engine' => 'google', 'pageParam' => 'start', 'step' => 10],
    'bing' => ['engine' => 'bing', 'pageParam' => 'first', 'step' => 10],
    'yahoo' => ['engine' => 'yahoo', 'pageParam' => 'b', 'step' => 10],
    'duckduckgo' => ['engine' => 'duckduckgo', 'pageParam' => 'start', 'step' => 30]
];

if (!isset($engineMap[$search_engine])) {
    echo json_encode(['success' => false, 'message' => 'Unsupported search engine']);
    exit;
}

$config = $engineMap[$search_engine];
$engine = $config['engine'];
$pageParam = $config['pageParam'];
$step = $config['step'];

$found = false;
$target_url = null;
$previous_url = null;

// Loop through up to 5 pages
for ($page = 0; $page <= 4; $page++) {
    $offset = $page * $step;
    $serp_url = "https://serpapi.com/search.json?engine={$engine}&q=" . urlencode($keywords) . "&{$pageParam}={$offset}&api_key={$serpApiKey}";

    $response = @file_get_contents($serp_url);
    if (!$response) continue;

    $data = json_decode($response, true);
    file_put_contents("debug_serp_output.txt", "== $search_engine Search (page=$page) ==\n$response\n\n", FILE_APPEND);

    $found_urls = [];
    if (!empty($data['organic_results'])) {
        foreach ($data['organic_results'] as $result) {
            if (!empty($result['link'])) {
                $found_urls[] = $result['link'];
            }
        }
    }

    foreach ($found_urls as $index => $url) {
        $parsed_host = parse_url($url, PHP_URL_HOST);
        $clean_host = str_ireplace("www.", "", strtolower($parsed_host));
        $clean_domain = str_ireplace("www.", "", strtolower($normalized_domain));

        if (strpos($clean_host, $clean_domain) !== false) {
            $target_url = $url;
            $previous_url = $found_urls[$index - 1] ?? null;
            $found = true;
            break 2;
        }
    }
}

if ($found && $target_url) {
    echo json_encode([
        'success' => true,
        'target_url' => $target_url,
        'previous_url' => $previous_url
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Target domain not found in top 5 pages',
        'target_url' => null,
        'previous_url' => null
    ]);
}
?>
