const l10n = require("../helpers/l10n").default;

const id = "EVENT_WAIT";
const groups = ["EVENT_GROUP_TIMER"];

const autoLabel = (fetchArg, input) => {
  if (input.units === "frames") {
    return l10n("EVENT_WAIT_LABEL", {
      time: fetchArg("frames"),
      units: l10n("FIELD_FRAMES"),
    });
  }
  return l10n("EVENT_WAIT_LABEL", {
    time: fetchArg("time"),
    units: l10n("FIELD_SECONDS"),
  });
};

const fields = [
  {
    type: "group",
    fields: [
      {
        key: "time",
        type:"union",
        types: ["number", "variable", "property"],
        defaultType: "number",
        label: l10n("FIELD_DURATION"),
        description: l10n("FIELD_DURATION_WAIT_DESC"),
        min: 0,
        max: 60,
        step: 0.1,
        defaultValue: {
          number: 3,
          variable: "LAST_VARIABLE",
          property: "$self$:xpos",
        },
        unitsField: "units",
        unitsDefault: "time",
        unitsAllowed: ["time", "frames"],
        conditions: [
          {
            key: "units",
            ne: "frames",
          },
        ],
      },
      {
        key: "frames",
        type:"union",
        label: l10n("FIELD_DURATION"),
        description: l10n("FIELD_DURATION_WAIT_DESC"),
        types: ["number", "variable", "property"],
        defaultType: "number",
        min: 0,
        max: 3600,
        width: "50%",
        defaultValue: {
          number: 90,
          variable: "LAST_VARIABLE",
          property: "$self$:xpos",
        },
        unitsField: "units",
        unitsDefault: "time",
        unitsAllowed: ["time", "frames"],
        conditions: [
          {
            key: "units",
            eq: "frames",
          },
        ],
      },
    ],
  },
];

const compile = (input, helpers) => {
  const { 
    wait,
    variableFromUnion,
    temporaryEntityVariable,
  } = helpers;
  let frames = 0;
  
  if (input.time.type === "number"){
    if (input.units === "frames") {
      frames = input.frames.value;
    } else {
        const seconds = input.time.value;
        frames = Math.ceil(seconds * 60);
    };
  }else {

    // if (input.units === "frames") {
    //     // const timeVar = variableFromUnion(input.time.value, temporaryEntityVariable(0));
    //     frames = input.frames.value;
    // } else {
    //     // timeVar = variableFromUnion(input.time.value, temporaryEntityVariable(0));             !!!!!!!!!!! WORK HERE !!!!!!!!!!!
    //     const seconds = input.time.value;
    //     frames = Math.ceil(seconds * 60);
    // };
  }

    if (frames > 0) {
      wait(frames); 
    }
  
};

module.exports = {
  id,
  description: l10n("EVENT_WAIT_DESC"),
  autoLabel,
  groups,
  fields,
  compile,
  waitUntilAfterInitFade: true,
};