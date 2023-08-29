<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Images</title>
    <!-- Add Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<?php
$searchData = [
    ['term' => 'conjuring', 'title' => 'The Conjuring'],
    ['term' => 'avengers', 'title' => 'avengers'],
    ['term' => 'adventure', 'title' => 'Adventure'],
    ['term' => 'guardians+of+the+galaxy', 'title' => 'Guardians of the Galaxy'],
    
];

$apiKey = "fc1fef96";

?>

<div class="container mt-5">
    <?php foreach ($searchData as $data) { ?>
        <?php
        $apiUrl = "https://www.omdbapi.com/?s=${data['term']}&page=1&apikey=${apiKey}";
        $response = file_get_contents($apiUrl);
        $responseData = json_decode($response, true);

        $movies = [];

        if (isset($responseData['Search'])) {
            $movies = $responseData['Search'];
        }
        ?>

        <h3><?php echo $data['title']; ?></h3>
        <div class="row row-cols-1 row-cols-md-5 g-4">
            <?php foreach ($movies as $movie) { ?>
                <div class="col">
                    <div class="card">
                        <img src="<?php echo $movie['Poster']; ?>" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo $movie['Title']; ?></h5>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>

</body>
</html>
