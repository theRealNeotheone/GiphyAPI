var topics = ["frog", "eagle", "orca", "panda", "falcon", "hawk", "sloth", "elephant", "alligator", "hyena", "duckling", "gorilla", "lion", "cheetah", "tiger", "wolf", "dolphin", "chameleon", "kangaroo", "koala", "red panda", "fox", "squirrel", "giraffe", "rabbit", "parrot", "polar bear", "meerkat"];

function renderButtons() {
  
  $("#buttons-div").empty();
  
	for (var i = 0; i < topics.length; i++) {
  	var b = $("<button>");
    
    b.addClass("btn btn-primary btn-xs animal-button");
    b.attr("id", "animal-button");
     
    b.attr("data-name", topics[i]);
    
    b.text(topics[i]);
    
    $("#buttons-div").append(b);
    
    console.log(topics[i]);
  };
};


function displayImages() {  
  
  $(".animal-button").on("click", function() {
    console.log("click!");
    var animalTopic = $(this).attr("data-name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      
      $("#gif-container").empty();
      // Storing an array of results in the results variable
      var results = response.data;
      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        
        if (results[i].rating !== "r") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");
         
          var rating = results[i].rating;
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);
          // Creating an image tag
          var animalImage = $("<img>");
         
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.attr("data-state", "still");
          
          gifDiv.append(animalImage);
          gifDiv.append(p);
          $("#gif-container").prepend(gifDiv);
          $(animalImage).on("click", function() {
           
            var state = $(this).attr("data-state");
            
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              
              $(this).attr("data-state", "animate");
           
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            };
          });
        };
      };
    });
  });
};


function remakeButtons() {	
	$("#add-topic").on("click", function(event) {
	  event.preventDefault();
	  // Grabbing the text from the input box
	  var animal = $("#inputDefault").val().trim();
	  
	  topics.push(animal);
	  console.log(topics);
	  $("#inputDefault").val("");
	 	
	  renderButtons();
    displayImages();
	});
};
 

$(document).ready(function() {
  remakeButtons();
 	renderButtons();
  displayImages();
});