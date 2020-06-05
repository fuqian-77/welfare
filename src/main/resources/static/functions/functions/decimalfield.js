Ext.define('Ext.form.DecimalField',{
	extend:'Ext.form.field.Number',
	alias: 'widget.decimalfield',
    alternateClassName: ['Ext.form.DecimalField', 'Ext.form.NumberDec'],
    /**
     * @cfg {RegExp} stripCharsRe @hide
     */
    /**
     * @cfg {RegExp} maskRe @hide
     */

    /**
     * @cfg {Boolean} allowDecimals
     * False to disallow decimal values
     */
    allowDecimals : true,

    /**
     * @cfg {String} decimalSeparator
     * Character(s) to allow as the decimal separator
     */
    decimalSeparator : '.',

    /**
     * @cfg {Number} decimalPrecision
     * The maximum precision to display after the decimal separator
     */
    decimalPrecision : 2,

    /**
     * @cfg {Number} minValue
     * The minimum allowed value (defaults to Number.NEGATIVE_INFINITY). Will be used by the field's validation logic,
     * and for {@link Ext.form.field.Spinner#setSpinUpEnabled enabling/disabling the down spinner button}.
     */
    minValue: Number.NEGATIVE_INFINITY,

    /**
     * @cfg {Number} maxValue
     * The maximum allowed value (defaults to Number.MAX_VALUE). Will be used by the field's validation logic, and for
     * {@link Ext.form.field.Spinner#setSpinUpEnabled enabling/disabling the up spinner button}.
     */
    maxValue: Number.MAX_VALUE,

    /**
     * @cfg {Number} step
     * Specifies a numeric interval by which the field's value will be incremented or decremented when the user invokes
     * the spinner.
     */
    step: 1,

    /**
     * @cfg {String} minText
     * Error text to display if the minimum value validation fails.
     */
    minText : 'The minimum value for this field is {0}',

    /**
     * @cfg {String} maxText
     * Error text to display if the maximum value validation fails.
     */
    maxText : 'The maximum value for this field is {0}',

    /**
     * @cfg {String} nanText
     * Error text to display if the value is not a valid number. For example, this can happen if a valid character like
     * '.' or '-' is left in the field with no number.
     */
    nanText : '{0} is not a valid number',

    /**
     * @cfg {String} negativeText
     * Error text to display if the value is negative and {@link #minValue} is set to 0. This is used instead of the
     * {@link #minText} in that circumstance only.
     */
    negativeText : 'The value cannot be negative',

    /**
     * @cfg {String} baseChars
     * The base set of characters to evaluate as valid numbers.
     */
    baseChars : '0123456789',

    /**
     * @cfg {Boolean} autoStripChars
     * True to automatically strip not allowed characters from the field.
     */
    autoStripChars: false,

    initComponent: function() {
        var me = this,
            allowed;

        me.callParent();

        me.setMinValue(me.minValue);
        me.setMaxValue(me.maxValue);

        // Build regexes for masking and stripping based on the configured options
        if (me.disableKeyFilter !== true) {
            allowed = me.baseChars + '';
            if (me.allowDecimals) {
                allowed += me.decimalSeparator;
            }
            if (me.minValue < 0) {
                allowed += '-';
            }
            allowed = Ext.String.escapeRegex(allowed);
            me.maskRe = new RegExp('[' + allowed + ']');
            if (me.autoStripChars) {
                me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
            }
        }
    },

    /**
     * Runs all of Number's validations and returns an array of any errors. Note that this first runs Text's
     * validations, so the returned array is an amalgamation of all field errors. The additional validations run test
     * that the value is a number, and that it is within the configured min and max values.
     * @param {Object} [value] The value to get errors for (defaults to the current field value)
     * @return {String[]} All validation errors for this field
     */
    getErrors: function(value) {
        var me = this,
            errors = me.callParent(arguments),
            format = Ext.String.format,
            num;

        value = Ext.isDefined(value) ? value : this.processRawValue(this.getRawValue());

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }

        value = String(value).replace(me.decimalSeparator, '.');

        if(isNaN(value)){
            errors.push(format(me.nanText, value));
        }

        num = me.parseValue(value);

        if (me.minValue === 0 && num < 0) {
            errors.push(this.negativeText);
        }
        else if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }
        return errors;
    },

    rawToValue: function(rawValue) {
        var value = this.fixPrecision(this.parseValue(rawValue));
        if (value === null) {
            value = rawValue || null;
        }
        return  value;
    },

    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        precision=me.decimalPrecision;
       // value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
		if (value == null) value = '0';  //20130501自己改
		if (value == '0' && precision>0){  //20130613自己改
			value+= '.';
			for (var i=1;i<=precision;i++)  value+= '0';  //添加小数位数
		}
        value = isNaN(value) ? '' : String(value).replace('.', decimalSeparator);
        return value;
    },

    onChange: function() {
        var me = this,
            value = me.getValue(),
            valueIsNull = value === null;
        me.callParent(arguments);
        // Update the spinner buttons
        me.setSpinUpEnabled(valueIsNull || value < me.maxValue);
        me.setSpinDownEnabled(valueIsNull || value > me.minValue);
    },

    /**
     * Replaces any existing {@link #minValue} with the new value.
     * @param {Number} value The minimum value
     */
    setMinValue : function(value) {
        this.minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
    },

    /**
     * Replaces any existing {@link #maxValue} with the new value.
     * @param {Number} value The maximum value
     */
    setMaxValue: function(value) {
        this.maxValue = Ext.Number.from(value, Number.MAX_VALUE);
    },

    // private
    parseValue : function(value) {
        value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
        return isNaN(value) ? null : value;
    },

    /**
     * @private
     */
    fixPrecision : function(value) {
        var me = this,
            nan = isNaN(value),
            precision = me.decimalPrecision;
        if (!this.allowDecimals || precision == -1  
                || nan || !value) {  
            return nan ? '' : value;  
        }  
        return parseFloat(value).toFixed(precision);  
    },

    beforeBlur : function() {
        var me = this,
            v = me.parseValue(me.getRawValue());

        if (v==null || isNaN(v)) v='0';  //20130501自己改
        if (!Ext.isEmpty(v)) {
            me.setValue(v);
        }
    },
    
	 setValue : function(v) {  
        v = typeof v == 'number' ? v : (String(v)  
                .replace(this.decimalSeparator, "."));  
        v = isNaN(v) ? '' : String(v).replace(".",  
                this.decimalSeparator);  
        Ext.form.NumberField.superclass.setValue.call(this, v);  
    },
    
    onSpinUp: function() {
        var me = this;
        if (!me.readOnly) {
            //me.setValue(Ext.Number.constrain(me.getValue() + me.step, me.minValue, me.maxValue));
            me.setValue(Ext.Number.constrain(eval(me.getValue()) + me.step, me.minValue, me.maxValue));
        }
    },

    onSpinDown: function() {
        var me = this;
        if (!me.readOnly) {
            //me.setValue(Ext.Number.constrain(me.getValue() - me.step, me.minValue, me.maxValue));
            me.setValue(Ext.Number.constrain(eval(me.getValue()) - me.step, me.minValue, me.maxValue));
        }
    }
});