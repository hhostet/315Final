function processRecipes(recipes){
    console.log(recipes);
        $('.recipeView').html('');
        //append recipe to page, each and loop through
        $.each(recipes, function(idx, value) {
           $('.recipeView').append(
                ` <b class="viewhead">${value.name}</b>
                <br>
                <img src="/images/recipe-pizza.jpg" alt="Recipe Image" class="viewimg">
            </div>
            <div class="grid-item">
                <h1 class="viewhead">Description:</h1>
                <p class="viewtext">
                    ${value.description}
                </p>
                <h1 class="viewhead">Total Time:</h1>
                <br>
                <p class="viewtext">
                    ${value.time.hour}h ${value.time.min} min
                </p>
                <h1 class="viewhead">Servings:</h1>
                <p class="viewtext">
                    ${value.servingsize} servings
                </p>
            </div>
            <div class="grid-item">
                <h1 class="viewhead" style="padding-top: 0px">Ingredients:</h1>
                <p class="viewtext">
                    ${value.ingredients}
                </p>
                <h1 class="viewhead">Instructions:</h1>
                <p class="viewtext">
                    ${value.instructions}
                </p>

                <button class="recipeEdit" id="${idx}" style="margin-left: 0px; margin-top: 60px"><a href="edit.html">Edit Recipe</button>
            </div>
            <br>
                `
           );
          
        });

        $('.recipeholder').html('');
        $.each(recipes, function(idx, value) {
            $('.recipeholder').append(
                 `
                 <div class="grid-item">
                    <div class="container">
                        <div class="img" style="background-image:url('/images/recipe-pizza.jpg');"></div>
                        <div class="middle">
                            <div class="text">
                            
                                <a href="view.html" id="view">
                                    View
                                </a>
                            </div>
                        </div> 
                        
                    </div> 
                    <div class="desc">
                        <h2>${value.name}</h2>
                        <br>
                        <p>
                            ${value.description}
                        </p>   
                        <div class="time">
                            <img src="/images/time.svg" alt="Time" style ="width:23px; height:auto">
                            ${value.time.hour}h ${value.time.min} min
                        </div>
                        <div>
                            <img src="/images/servings.svg" alt="Time" style ="width:23px; height:auto">
                            ${value.servingsize} servings
                        </div>
                    </div>
                    <button class="recipeEdit" id="${idx}"><a href="edit.html">Edit Recipe</a></button>
                    <button class="delete" id="${idx}">Delete Recipe</button>
                    </div>
                `
            );
           
         });

    $(".recipeEdit").click(function(e){
        //get recipe id
        var recipeKey= e.currentTarget.id;
        //redirect to edit page instead of console.log
        console.log($('#recipeName' + recipeKey).val());
        console.log($('#recipeDescription' +recipeKey).val());
        var newEdit = {
            name: $('#recipeName' + recipeKey).val(),
            description: $('#recipeDescription' +recipeKey).val(),
        }
        FIREBASE_UTILITY.updateRecipe(recipeKey, newEdit);
    });

    $(".delete").click(function(e){
        //get recipe id 
        var recipeKey= e.currentTarget.id;
        console.log("delete");
        FIREBASE_UTILITY.deleteRecipe(recipeKey);
    });

    
}

function init(){
    //user click listener
    $(".signupbtn").click(function(){
        console.log("User Added");
        let password = $("#addLoginPassword").val();
        let email = $("#addLoginEmail").val();
        let firstname = $("#addLoginFirstName").val();
        let lastname = $("#addLoginLastName").val();
        FIREBASE_UTILITY.writeUserData(password, email, firstname, lastname);
        alert("This user has been added!");
        console.log('First Name: ' + firstname);
        console.log('Last Name: ' + lastname);
        console.log('E-Mail: ' +  email);
    });
    //click listener
    $(".add").click(function(){
        console.log("Recipe Added");
        alert("Your recipe has been added!");
        let name = $("#addRecipeName").val();
        let description = $("#addRecipeDescription").val();
        let servingSize = $("#addServingSize").val();
        let ingredients = $("#addIngredients").val();
        let hour = $("#addRecipeHour").val();
        let minute = $("#addRecipeMinute").val();
        let instructions = $("#addInstructions").val();
        FIREBASE_UTILITY.writeData(name, description, servingSize, ingredients, hour, minute, instructions);
    });

    $(".delete").click(function(){
        console.log("delete");
        alert("This recipe has been deleted!");
        FIREBASE_UTILITY.deleteRecipe();
    });
    $(".edit").click(function(){
        console.log("edit");
        FIREBASE_UTILITY.updateRecipe();
    });
     $(".show").click(function(){
         console.log('show');
         FIREBASE_UTILITY.getOneRecipes(processRecipes);
     });

};

FIREBASE_UTILITY.getAllRecipes(processRecipes);

$(document).ready(function(){
    init();
});