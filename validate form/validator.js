function validator(formSelector) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            } else {
                element = element.parentElement;
            }
        }
    }

    let formRules = {};

    let validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function (value) {
            let regex = '^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$';
            return regex.test(value) ? undefined : 'Vui lòng nhập email';

        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập trên ${min} kí tự`;
            }
        },
        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Vui lòng nhập dưới ${max} kí tự`;
            }
        }
    }

    let formElement = document.querySelector(formSelector);

    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (let input of inputs) {

            let rules = input.getAttribute('rules').split('|');

            for (let rule of rules) {

                let ruleInfo;
                let isRuleHasValue = (rule.includes(':'));

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                let ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = ruleFunc;
                }
            }

            input.onblur = handleValidate;
            input.oninput = handleClearErr;
        }

        function handleValidate(event) {
            let rules = formRules[event.target.name];
            let errorMsg;

            // rules.find(function (rule) {
                errorMsg = rules(event.target.value);
                // return errorMsg;
            // });

            if (errorMsg) {
                let formGroup = getParent(event.target, '.form-group');
                if(formGroup) {
                    formGroup.classList.add('invalid');
                    let formMsg = formGroup.querySelector('.form-message');
                    formMsg.innerText = errorMsg;
                }
            }   
        }

        function handleClearErr(event) {
            let formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('invalid'));
                formGroup.classList.remove('invalid');

                let formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText = '';
                }
        }
    }

    formElement.onsubmit = function (event) {
        event.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (let input of inputs) {
            console.log(input.value);
            handleValidate({
                target: input;
            });
        }
    }

}
