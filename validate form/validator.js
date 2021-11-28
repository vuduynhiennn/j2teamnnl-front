function validator(formSelector) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement) {
                if (element.parentElement.matchs(selector)) {
                    return element.
                }
            }
        }
    }

    let formRules = {};

    let validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function (value) {
            let regex = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`;
            }
            // return value ? undefined : 'Vui lòng nhập trường này';
        }
    };




    let formElement = document.querySelector(formSelector);

    if (formElement) {

        let inputs = formElement.querySelectorAll('[name][rules]');

        for (let input of inputs) {
            let rules = input.getAttribute('rules').split('|');

            for (rule of rules) {
                if (rule.includes(':')) {
                    let ruleInfor = rule.split(':');
                    rule = ruleInfor[0];
                }




                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(validatorRules[rule]); 
                } else {
                    formRules[input.name] = [validatorRules[rule]];
                };
            }

            // lắng nghe sự kiện để validate (blur, )
            input.onblur = handleValidate;            
        }

        function handleValidate(event) {
            let rules = formRules[event.target.name];
            let errorMessage;

            rules.find(function (rule) {
                errorMessage = rule(event.target.value);
                return errorMessage;
            });                        
        }

        // console.log(formRules);
    }
}
