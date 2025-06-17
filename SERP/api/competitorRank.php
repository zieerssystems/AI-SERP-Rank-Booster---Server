<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from the POST request
    $data = json_decode(file_get_contents("php://input"), true);

    // Log the data for debugging
    error_log(print_r($data, true));

    // Sample response - Replace this with your actual rank-checking logic
    $results = [];

    // Add target domain results
    $results[] = [
        'domain' => $data['targetDomain'],
        'rank' => rand(1, 20),
        'keyword' => $data['keyword']
    ];

    // Add competitor domains results
    foreach ($data['competitorDomains'] as $competitorDomain) {
        $results[] = [
            'domain' => $competitorDomain,
            'rank' => rand(1, 20), // Replace this with actual rank fetching logic
            'keyword' => $data['keyword']
        ];
    }

    // Return the response as JSON
    echo json_encode(['results' => $results]);
}
?>