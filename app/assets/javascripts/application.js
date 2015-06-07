// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap

//creates namespacing structure for module
//path should be a string with namespacing parts seperated by dot.
window.defineModule = function(path, module) {
  if (!window.modules) {
    window.modules = {};
  }
  //creating array of namespacing parts
  var parts = path.split(".");
  //creating namespacing structure
  _.reduce(parts, function(fullPath, part) {
    if (!fullPath[part]) {
      //sets module into last namespacing part
      if (_.last(parts) == part) {
        fullPath[part] = module;
      } else {
        fullPath[part] = {};
      }
    }
    return fullPath[part];
  }, window.modules, this);

}

//searches for module in namespacing structure
//path should a string with namespacing parts seperated by dot.
window.requireModule = function(path) {
  //creating array of namespacing parts
  var parts = path.split(".");
  var error = "module " + path + " isn't defined";
  //searching for module
  var module = _.reduce(parts, function(fullPath, part) {
    //if module doesn't exist will throw error
    try {
      return fullPath[part];
    } catch(e) {
      throw new Error(error);
    }
    return ;
  }, window.modules, this);

  if (_.isUndefined(module)) {
    throw new Error(error);
  }

  return module;
};
