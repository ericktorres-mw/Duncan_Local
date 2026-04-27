/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(["N/ui/serverWidget"], function (serverWidget) {
  function onRequest(context) {
    if (context.request.method !== "GET") return;

    var form = serverWidget.createForm({
      title: "Cycle Collaboration"
    });

    var nameField = form.addField({
      id: "custpage_name",
      type: serverWidget.FieldType.TEXT,
      label: "Your name"
    });
    nameField.layoutType = serverWidget.FieldLayoutType.NORMAL;
    nameField.updateBreakType({ breakType: serverWidget.FieldBreakType.STARTCOL });
    nameField.defaultValue = context.request.parameters.name || "world";

    form.addField({
      id: "custpage_when",
      type: serverWidget.FieldType.DATE,
      label: "When"
    });

    var greeting = form.addField({
      id: "custpage_greeting",
      type: serverWidget.FieldType.TEXT,
      label: "Greeting"
    });
    greeting.defaultValue = "Hello, " + (context.request.parameters.name || "world");
    greeting.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });

    form.addSubmitButton({ label: "Greet" });

    context.response.writePage(form);
  }

  return {
    onRequest: onRequest
  };
});
