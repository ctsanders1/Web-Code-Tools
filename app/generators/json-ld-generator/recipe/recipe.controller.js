(function () {
  'use strict';

  angular.module('app.generators.jsonLd')
  .controller('JsonLdRecipeController', [function() {
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

    this.jsonLd = function() {
      var html = '<script type="application/ld+json">';

      html += '\n{\n  "@context": "http://schema.org/",';

      html += '\n  "@type": "Recipe",';
      html += '\n  "name": "' + this.data.recipeName + '",';
      html += '\n  "image": "' + this.data.photo + '",';
      html += '\n  "author": "' + this.data.creator + '",';
      html += '\n  "description": "' + this.data.description + '",';

      var ingredientsList = this.data.ingredients.split("\n");
      html += '\n  "recipeIngredient": [';

      for (var i = 0; i < ingredientsList.length; ++i) {
        html += '\n    "' + ingredientsList[i] + '"';
        if (i < (ingredientsList.length - 1)) html += ',';
      }

      html += '\n  ],';

      html += '\n  "recipeInstructions": "' + this.data.instructions + '",';
      html += '\n  "prepTime": "' + getISOTime(this.data.prepTime) + '",';
      html += '\n  "cookTime": "' + getISOTime(this.data.cookTime) + '",';
      html += '\n  "totalTime": "' + getISOTime(this.data.totalTime) + '",';
      html += '\n  "recipeYield": "' + this.data.yield + '"';

      if (this.data.calories || this.data.fat) {
        html += ',';
        html += '\n  "nutrition": {';
        html += '\n    "@type": "NutritionInformation",';

        if (this.data.calories) {
          html += '\n    "calories": "' + this.data.calories + '"';
        }

        if (this.data.calories && this.data.fat) {
          html += ',';
        }

        if (this.data.fat) {
          html += '\n    "fatContent": "' + this.data.fat + '"';
        }

        html += '\n  }';
      }

      html += '\n}';

      html += '\n</script>';

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
