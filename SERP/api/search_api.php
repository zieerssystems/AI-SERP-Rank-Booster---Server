<?php
header("Content-Type: application/json");
require 'vendor/autoload.php'; // If using a package like Guzzle

$api_key = "YOUR_GEMINI_API_KEY"; // Replace with your Gemini API Key
$keyword = $_GET['keyword'] ?? '';

if (!$keyword) {
    echo json_encode(["error" => "Keyword is required"]);
    exit;
}

$url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=$api_key";

// Request body to Gemini API
$data = [
    "contents" => [
        ["parts" => [["text" => "Search results for $keyword. List the top 10 URLs."]]]
    ]
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
$search_results = json_decode($response, true);

// ✅ Check if API response is valid
if (!$search_results || !isset($search_results['candidates'][0]['content']['parts'][0]['text'])) {
    echo json_encode(["error" => "Invalid API response"]);
    exit;
}

// ✅ Extract URLs from the response
$result_text = $search_results['candidates'][0]['content']['parts'][0]['text'];
preg_match_all('/https?:\/\/[^\s]+/', $result_text, $matches);
$found_urls = $matches[0] ?? [];

// ✅ Log extracted URLs (for debugging)
error_log("🔍 Extracted URLs: " . json_encode($found_urls));

// Check if any URLs are found
if (empty($found_urls)) {
    echo json_encode(["success" => false, "error" => "No search results found"]);
    exit;
}

// ✅ Find previous-ranked link
$target_domain = "yourdomain.com"; // Change to your target domain
$found_position = null;
$prev_link = null;
$found_link = null;

foreach ($found_urls as $index => $url) {
    if (strpos($url, $target_domain) !== false) {
        $found_link = $url;
        $found_position = $index + 1;
        if ($found_position > 1) {
            $prev_link = $found_urls[$found_position - 2];
        }
        break;
    }
}

// ✅ Prepare final response
$response_data = [
    "success" => true,
    "results" => [
        "keyword" => $keyword,
        "found_link" => $found_link,
        "found_position" => $found_position,
        "previous_rank_link" => $prev_link
    ]
];

echo json_encode($response_data);
?>
