(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["key-risk.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"defra-map-key__section\">\n    <span class=\"defra-map-key__section-title\">Forecast flood risk areas</span>\n    <div class=\"defra-map-key__item\">\n      <div class=\"govuk-checkboxes govuk-checkboxes--small\">\n        <div class=\"govuk-checkboxes__item\">\n          <input class=\"govuk-checkboxes__input\" id=\"vl\" name=\"vl\" type=\"checkbox\" value=\"vl\" aria-controls=\"viewport\" data-risk-level=\"1\" checked>\n          <label class=\"govuk-label govuk-checkboxes__label\" for=\"vl\">\n            <span class=\"defra-map-key__symbol-container\">\n              <span class=\"defra-map-key__symbol\">\n                <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#85994b;stroke:#85994b;stroke-width:1px;\"/><g><circle cx=\"12\" cy=\"12\" r=\"1\" style=\"fill:#ffffff;\"/><circle cx=\"12\" cy=\"20\" r=\"1\" style=\"fill:#ffffff;\"/><circle cx=\"20\" cy=\"12\" r=\"1\" style=\"fill:#ffffff;\"/><circle cx=\"20\" cy=\"20\" r=\"1\" style=\"fill:#ffffff;\"/></g></svg>\n              </span>\n              Very low risk\n            </span>\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"defra-map-key__item\">\n      <div class=\"govuk-checkboxes govuk-checkboxes--small\">\n        <div class=\"govuk-checkboxes__item\">\n          <input class=\"govuk-checkboxes__input\" id=\"l\" name=\"l\" type=\"checkbox\" value=\"l\" aria-controls=\"viewport\" data-risk-level=\"2\" checked>\n          <label class=\"govuk-label govuk-checkboxes__label\" for=\"l\">\n            <span class=\"defra-map-key__symbol-container\">\n              <span class=\"defra-map-key__symbol\">\n                <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:rgb(255,221,0);stroke:rgb(255,221,0);stroke-width:1px;\"/><path d=\"M13,5L5,13\" style=\"fill:none;fill-rule:nonzero;stroke:white;stroke-width:1px;\"/><path d=\"M21,5L5,21\" style=\"fill:none;fill-rule:nonzero;stroke:white;stroke-width:1px;\"/><path d=\"M27,23L23,27\" style=\"fill:none;fill-rule:nonzero;stroke:white;stroke-width:1px;\"/><path d=\"M27,7L7,27\" style=\"fill:none;fill-rule:nonzero;stroke:white;stroke-width:1px;\"/><path d=\"M27,15L15,27\" style=\"fill:none;fill-rule:nonzero;stroke:white;stroke-width:1px;\"/></svg>\n              </span>\n              Low risk\n            </span>\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"defra-map-key__item\">\n      <div class=\"govuk-checkboxes govuk-checkboxes--small\">\n        <div class=\"govuk-checkboxes__item\">\n          <input class=\"govuk-checkboxes__input\" id=\"m\" name=\"m\" type=\"checkbox\" value=\"m\" aria-controls=\"viewport\" data-risk-level=\"3\" checked>\n          <label class=\"govuk-label govuk-checkboxes__label\" for=\"m\">\n            <span class=\"defra-map-key__symbol-container\">\n              <span class=\"defra-map-key__symbol\">\n                <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" style=\"fill-rule:evenodd;clip-rule:evenodd;\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#F47738;stroke:#F47738;stroke-width:1px;\"/><path d=\"M13,5l-8,8\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M21,5l-16,16\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M27,23l-4,4\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M27,7l-20,20\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M27,15l-12,12\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M5,19l8,8\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M5,11l16,16\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M23,5l4,4\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M7,5l20,20\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M15,5l12,12\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/></svg>\n              </span>\n              Medium risk\n            </span>\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"defra-map-key__item\">\n      <div class=\"govuk-checkboxes govuk-checkboxes--small\">\n        <div class=\"govuk-checkboxes__item\">\n          <input class=\"govuk-checkboxes__input\" id=\"h\" name=\"h\" type=\"checkbox\" value=\"h\" aria-controls=\"viewport\" data-risk-level=\"4\" checked>\n          <label class=\"govuk-label govuk-checkboxes__label\" for=\"h\">\n            <span class=\"defra-map-key__symbol-container\">\n              <span class=\"defra-map-key__symbol\">\n                <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" style=\"fill-rule:evenodd;clip-rule:evenodd;\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#d4351c;stroke:#d4351c;stroke-width:1px;\"/><path d=\"M13,5l-8,8\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M21,5l-16,16\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M27,23l-4,4\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M27,7l-20,20\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M27,15l-12,12\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M5,19l8,8\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M5,11l16,16\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M23,5l4,4\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M7,5l20,20\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/><path d=\"M15,5l12,12\" style=\"fill:none;fill-rule:nonzero;stroke:#fff;stroke-width:1px;\"/></svg>\n              </span>\n              High risk\n            </span>\n          </label>\n        </div>\n      </div>\n    </div>\n  </div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["scenarios.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"defra-map-scenarios__container\">\n    <button class=\"defra-map-scenario-button\" data-scenario=\"1\" aria-selected=\"true\">\n        <strong>Most likely</strong><br>3.3% chance\n    </button>\n    <button class=\"defra-map-scenario-button\" data-scenario=\"2\">\n        <strong>Less likely</strong><br>1% chance\n    </button>\n    <button class=\"defra-map-scenario-button\" data-scenario=\"3\">\n        <strong>Least likely</strong><br>0.1% chance\n    </button>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
