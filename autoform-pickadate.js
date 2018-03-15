/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const utcToLocal = function(utcDate) {
  const localDateObj = new Date;
  localDateObj.setDate(utcDate.getUTCDate());
  localDateObj.setMonth(utcDate.getUTCMonth());
  localDateObj.setFullYear(utcDate.getUTCFullYear());
  localDateObj.setHours(0);
  localDateObj.setMinutes(0);
  localDateObj.setSeconds(0);
  localDateObj.setMilliseconds(0);
  return localDateObj;
};

AutoForm.addInputType('pickadate', {
  template: 'afPickadate',
  valueOut() {
    if (this.val()) {
      let val;
      const picker = this.pickadate('picker');
      if (picker) {
        val = picker.get('select').obj;
      } else {
        val = this.val();
      }
      if (val instanceof Date) { return val; } else { return this.val(); }
    }
    return "";
  },

  valueConverters: {
    'string'(val) {
      if (val instanceof Date) { return AutoForm.Utility.dateToDateStringUTC(val); } else { return val; }
    },
    'stringArray'(val) {
      if (val instanceof Date) {
        return [ AutoForm.Utility.dateToDateStringUTC(val) ];
      }
      return val;
    },
    'number'(val) {
      if (val instanceof Date) { return val.getTime(); } else { return val; }
    },
    'numberArray'(val) {
      if (val instanceof Date) {
        return [ val.getTime() ];
      }
      return val;
    },
    'dateArray'(val) {
      if (val instanceof Date) {
        return [ val ];
      }
      return val;
    }
  }
}
);

Template.afPickadate.helpers({ 
  atts() {
    let atts = _.clone(this.atts);
    atts = AutoForm.Utility.addClass(atts, 'form-control');
    // cannot have nested atts or Blaze explodes
    delete atts.pickadateOptions;
    return atts;
  }
});

Template.afPickadate.rendered = function() {
  let $picker;
  const $input = this.$('input');
  let { data } = this;

  $input.pickadate(data.atts.pickadateOptions);
  this.picker = ($picker = $input.pickadate('picker'));

  // After selection ensure focus is lost, fixes an issue when switching tabs
  // and returning to the window would open the picker
  $picker.on('close', ()=> $(document.activeElement).blur());

  return this.autorun(function() {
    let startDate;
    data = Template.currentData();
    // set field value
    if (data.value instanceof Date) {
      $picker.set('select', data.value);
    } else if (typeof data.value === 'string') {
      if (data.value !== "") {
        $picker.set('select', data.value);
      }
    }
    // set start date if there's a min in the schema
    if (data.min instanceof Date) {
      // datepicker plugin expects local Date object,
      // so convert UTC Date object to local
      startDate = utcToLocal(data.min);
      $picker.set('min', startDate);
    }
    // set end date if there's a max in the schema
    if (data.max instanceof Date) {
      // datepicker plugin expects local Date object,
      // so convert UTC Date object to local
      const endDate = utcToLocal(data.max);
      return $picker.set('max', startDate);
    }
  });
};


Template.afPickadate.destroyed = function() {
  if (this.picker && this.picker.stop) {
    return this.picker.stop();
  }
};

