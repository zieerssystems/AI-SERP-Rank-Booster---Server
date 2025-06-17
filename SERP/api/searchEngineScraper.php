<?php
$keywords = urlencode($_GET['keywords']);
$domainName = $_GET['domain'];
$searchEngine = $_GET['searchEngine'];

$searchUrl = "";

switch ($searchEngine) {
    case "google":
        $searchUrl = "https://www.google.com/search?q=" . $keywords;
        break;
    case "bing":
        $searchUrl = "https://www.bing.com/search?q=" . $keywords;
        break;
    case "yahoo":
        $searchUrl = "https://search.yahoo.com/search?p=" . $keywords;
        break;
    case "duckduckgo":
        $searchUrl = "https://duckduckgo.com/html/?q=" . $keywords;
        break;
    default:
        echo json_encode(["error" => "Unsupported search engine"]);
        exit;
}

$options = [
    'http' => [
        'header' => "User-Agent: Mozilla/5.0\r\n"
    ]
];
$context = stream_context_create($options);
$html = file_get_contents($searchUrl, false, $context);

preg_match_all('/<a href="\/url\?q=(.*?)&amp;/i', $html, $matches);
$results = $matches[1];

$foundIndex = array_search($domainName, array_map(function($url) {
    $parsed = parse_url($url);
    return isset($parsed['host']) ? $parsed['host'] : $url;
}, $results));

if ($foundIndex !== false && $foundIndex > 0) {
    $prev = $results[$foundIndex - 1];
    $target = $results[$foundIndex];
    echo json_encode([
        "previousDomainUrl" => $prev,
        "domainUrl" => $target
    ]);
} else {
    echo json_encode(["error" => "Domain not found in top results"]);
}
?>
