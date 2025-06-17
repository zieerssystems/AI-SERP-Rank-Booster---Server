<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$searchEngine = $data['search_engine'] ?? 'google';
$keywords = $data['keywords'] ?? '';
$domainName = $data['domain_name'] ?? '';

if (!$keywords || !$domainName) {
    echo json_encode(['success' => false, 'error' => 'Missing keywords or domain_name']);
    exit;
}

$apiKey = 'b564a9e38e8cdf143798e0a8b2900b867820b6129c700090afef8e310dc57859'; // Your SerpAPI key

$engineMap = [
    'google' => 'google',
    'bing' => 'bing',
    'yahoo' => 'yahoo',
    'duckduckgo' => 'duckduckgo'
];

$engine = $engineMap[strtolower($searchEngine)] ?? 'google';

$allResults = [];
$foundResult = null;
$maxPages = 5;
$page = 0;

while ($page < $maxPages && !$foundResult) {
    $start = $page * 10;
    $url = "https://serpapi.com/search.json?engine={$engine}&q=" . urlencode($keywords) . "&api_key={$apiKey}&start={$start}";

    $response = file_get_contents($url);
    if (!$response) {
        echo json_encode(['success' => false, 'error' => 'Failed to fetch SerpAPI']);
        exit;
    }

    $json = json_decode($response, true);
    $organicResults = $json['organic_results'] ?? [];

    foreach ($organicResults as $index => $result) {
        $link = $result['link'] ?? '';
        $host = parse_url($link, PHP_URL_HOST);
        $pos = $start + $index + 1;

        $allResults[] = ['position' => $pos, 'link' => $link];

        if (strpos($host, $domainName) !== false) {
            $foundResult = ['position' => $pos, 'link' => $link];
            break;
        }
    }

    $page++;
}

if (!$foundResult) {
    echo json_encode(['success' => true, 'found' => false]);
    exit;
}

$prevIndex = $foundResult['position'] - 2;
$previousDomain = $prevIndex >= 0 && isset($allResults[$prevIndex])
    ? $allResults[$prevIndex]['link']
    : null;

echo json_encode([
    'success' => true,
    'found' => true,
    'found_position' => $foundResult['position'],
    'domain_url' => $foundResult['link'],
    'previous_url' => $previousDomain
]);
