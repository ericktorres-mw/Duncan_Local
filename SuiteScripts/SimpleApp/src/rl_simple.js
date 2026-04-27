/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 *
 * RESTlet bridge for SimpleApp. Dispatches `action` → handler. Declared in
 * netsuite-tools.yaml so Cycle's MCP server exposes these handlers as tools.
 *
 * NOTE: NetSuite 2.1 rejects cross-script-type requires (a @NScriptType
 * Restlet can't `define()` a file marked @NScriptType Suitelet). That's
 * why the HTML render lives in simple_logic.js — a plain library — and
 * both scripts consume it identically.
 */
define(["./lib/simple_logic"], function (simpleLogic) {
  var handlers = {
    get_greeting: simpleLogic.getGreeting,
    reverse_text: simpleLogic.reverseText,
    get_suitelet: function (args) {
      return { html: simpleLogic.renderPage(args || {}) };
    }
  };

  function dispatch(body) {
    var action = body && body.action;
    var handler = handlers[action];
    if (!handler) {
      return { error: "Unknown action: " + action, statusCode: 404 };
    }
    try {
      return handler(body.args || {});
    } catch (e) {
      return { error: String((e && e.message) || e), statusCode: 500 };
    }
  }

  return {
    post: dispatch
  };
});
