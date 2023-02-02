(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["key-risk.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"defra-map-key__section\">\n  <h3 class=\"defra-map-key__section-title\">Rivers, seas and surface water</h3>\n  <div class=\"defra-map-key__item\">\n    <div class=\"govuk-radios govuk-radios--small\">\n      <div class=\"govuk-radios__item\">\n        <input class=\"govuk-radios__input\" id=\"all\" name=\"data\" type=\"radio\" value=\"ae\" aria-controls=\"viewport\">\n        <label class=\"govuk-label govuk-radios__label\" for=\"all\">\n          <span class=\"defra-map-key__symbol-container\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#5694ca\"/></svg>\n            </span>\n            Extent of flooding\n          </span>\n        </label>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"defra-map-key__section\">\n  <h3 class=\"defra-map-key__section-title\">River and seas</h3>\n  <div class=\"defra-map-key__item\">\n    <div class=\"govuk-radios govuk-radios--small\">\n      <div class=\"govuk-radios__item\">\n        <input class=\"govuk-radios__input\" id=\"rivers-seas\" name=\"data\" type=\"radio\" value=\"re\" aria-controls=\"viewport\">\n        <label class=\"govuk-label govuk-radios__label\" for=\"rivers-seas\">\n          <span class=\"defra-map-key__symbol-container\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#5694ca\"/></svg>\n            </span>\n            Extent of flooding\n          </span>\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.5;\"><circle cx=\"16\" cy=\"16\" r=\"12.5\" style=\"fill:#5694ca;stroke:#fff;stroke-width:1px;\"/><path d=\"M13,9.109l6,0l0,2.018l-3,0l0,0.968l3,0l0,2.027l-2,0l0,0.968l2,0l0,1.99l-2,0l0,0.968l2,0l0,2.485l-6,0.885l0,-12.309Z\" style=\"fill:#fff;\"/><path d=\"M10.697,21.184c0.393,0.389 0.886,0.731 1.767,0.731c1.792,0 1.711,-1.463 3.536,-1.463c1.825,0 1.71,1.463 3.536,1.463c0.826,0 1.24,-0.3 1.767,-0.731\" style=\"fill:none;stroke:#5595ca;stroke-width:3.5px;stroke-linecap:round;stroke-linejoin:miter;\"/><path d=\"M10.697,21.184c0.393,0.389 0.886,0.731 1.767,0.731c1.792,0 1.711,-1.463 3.536,-1.463c1.825,0 1.71,1.463 3.536,1.463c0.826,0 1.24,-0.3 1.767,-0.731\" style=\"fill:none;stroke:#fff;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:miter;\"/></svg>\n            </span>\n            River level and velocity\n          </span>\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"16\" r=\"12.5\" style=\"fill:#5694ca;stroke:#fff;stroke-width:1px;\"/><path d=\"M10.704,11.481C11.096,11.869 11.588,12.212 12.469,12.212C14.259,12.212 14.177,10.75 16,10.75C17.823,10.75 17.708,12.212 19.531,12.212C20.356,12.212 20.77,11.912 21.296,11.481\" style=\"fill:none;stroke:#fff;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:miter;\"/><path d=\"M10.704,16C11.096,16.389 11.588,16.731 12.469,16.731C14.259,16.731 14.177,15.269 16,15.269C17.823,15.269 17.708,16.731 19.531,16.731C20.356,16.731 20.77,16.431 21.296,16\" style=\"fill:none;stroke:#fff;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:miter;\"/><path d=\"M10.704,20.519C11.096,20.908 11.588,21.25 12.469,21.25C14.259,21.25 14.177,19.788 16,19.788C17.823,19.788 17.708,21.25 19.531,21.25C20.356,21.25 20.77,20.95 21.296,20.519\" style=\"fill:none;stroke:#fff;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:miter;\"/></svg>\n            </span>\n            Sea level and velocity\n          </span>\n        </label>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"defra-map-key__section\">\n  <h3 class=\"defra-map-key__section-title\">Surface water</h3>\n  <div class=\"defra-map-key__item\">\n    <div class=\"govuk-radios govuk-radios--small\">\n      <div class=\"govuk-radios__item\">\n        <input class=\"govuk-radios__input\" id=\"surface-water-depth\" name=\"data\" type=\"radio\" value=\"sd\" aria-controls=\"viewport\">\n        <label class=\"govuk-label govuk-radios__label\" for=\"surface-water-depth\">\n          Extent with depth\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#003078\"/></svg>\n            </span>\n            Over 0.9 metres\n          </span>\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#5694ca\"/></svg>\n            </span>\n            0.3 to 0.9 metres\n          </span>\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#AAC9E4\"/></svg>\n            </span>\n            Less than 0.3 metres\n          </span>\n        </label>\n      </div>\n    </div>\n  </div>\n  <div class=\"defra-map-key__item\">\n    <div class=\"govuk-radios govuk-radios--small\">\n      <div class=\"govuk-radios__item\">\n        <input class=\"govuk-radios__input\" id=\"surface-water-velocity\" name=\"data\" type=\"radio\" value=\"ss\" aria-controls=\"viewport\">\n        <label class=\"govuk-label govuk-radios__label\" for=\"surface-water-velocity\">\n          Extent with velocity\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#003078\"/></svg>\n            </span>\n            Over 0.25 m/s\n          </span>\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg aria-hidden=\"true\" focusable=\"false\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" style=\"fill:#5694ca\"/></svg>\n            </span>\n            Less than 0.25 m/s\n          </span>\n          <span class=\"defra-map-key__symbol-container defra-map-key__symbol-container--multi\">\n            <span class=\"defra-map-key__symbol\">\n              <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill-rule=\"evenodd\"><path d=\"M22.668 15.001l-8.584-8.584L15.5 5l11 11-11.002 11.003-1.414-1.414 8.588-8.588H5v-2h17.668z\" fill=\"currentColor\"/></svg>\n            </span>\n            Direction of flow\n          </span>\n        </label>\n      </div>\n    </div>\n  </div>\n</div>";
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
output += "<div class=\"defra-map-scenarios__container\">\n    <button class=\"defra-map-scenario-button\" data-scenario=\"1\" aria-selected=\"true\">\n        <strong>Most likely</strong>\n        <span>3.3% chance</span>\n    </button>\n    <button class=\"defra-map-scenario-button\" data-scenario=\"2\">\n        <strong>Less likely</strong>\n        <span>1% chance</span>\n    </button>\n    <button class=\"defra-map-scenario-button\" data-scenario=\"3\">\n        <strong>Least likely</strong>\n        <span>0.1% chance</span>\n    </button>\n</div>";
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
