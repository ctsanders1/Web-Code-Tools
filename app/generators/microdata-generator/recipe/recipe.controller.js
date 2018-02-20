(function () {
  'use strict';

  angular.module('app.generators.microdata')
  .controller('MicrodataRecipeController', [function() {
    this.data = {
      recipeName: '',
      photo: '',
      creator: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      totalTime: '',
      yield: '',
      calories: '',
      fat: ''
    };

    this.elementHtml = function() {
      var html = '<div itemscope itemtype="http://schema.org/Recipe">';

      html += '\n    <h1 itemprop="name">' + this.data.recipeName + '</h1><br>';
      html += '\n    <img itemprop="image" src="' + this.data.photo + '" alt="' + this.data.recipeName + '"><br>';
      html += '\n    By <span itemprop="author">' + this.data.creator + '</span><br>';
      html += '\n    <span itemprop="description">' + this.data.description + '</span><br>';

      var ingredientsList = this.data.ingredients.split("\n");
      html += '\n    <strong>Ingredients</strong><br>';
      html += '\n    <ul>';

      for (var i = 0; i < ingredientsList.length; ++i) {
        html += '\n        <li><span itemprop="recipeIngredient">' + ingredientsList[i] + '</span></li>';
      }

      html += '\n    </ul>';
      html += '\n    <span itemprop="recipeInstructions">' + this.data.instructions + '</span><br>';
      html += '\n    Prep time: <time datetime="' + getISOTime(this.data.prepTime)
        + '" itemprop="prepTime">' + this.data.prepTime + ' minutes</time><br>';
      html += '\n    Cook time: <time datetime="' + getISOTime(this.data.cookTime)
        + '" itemprop="cookTime">' + this.data.cookTime + '</time><br>';
      html += '\n    Total time: <time datetime="' + getISOTime(this.data.totalTime)
        + '" itemprop="totalTime">' + this.data.totalTime + '</time><br>';

      html += '\n    Yield: <span itemprop="recipeYield">' + this.data.yield + '</span><br>';

      if (this.data.calories || this.data.fat) {
        html += '\n    <div itemprop="nutrition" itemscope itemtype="http://schema.org/NutritionInformation">';
        if (this.data.calories) {
          html += '\n        Calories: <span itemprop="calories">' + this.data.calories + '</span>';
        }
        if (this.data.calories && this.data.fat) {
          html += '<br>';
        }
        if (this.data.fat) {
          html += '\n        Fat: <span itemprop="fatContent">' + this.data.fat + '</span>';
        }
        html += '\n    </div>';
      }

      html += '\n</div>';

      return html;
    }

    function getISOTime(time) {
      var isoTime = '';

      if (time) {
        isoTime += 'PT' + time;
        isoTime = isoTime.replace(':', 'H');
        isoTime += 'M';
      }

      return isoTime;
    }
  }]);
})();
