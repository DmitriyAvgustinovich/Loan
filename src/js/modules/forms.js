export class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms)
        this.inputs = document.querySelectorAll('input')

        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        }
        this.path = 'https://windows-el7h.onrender.com/api/data'
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = ''
        })
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]')

        mailInputs.forEach((input) => {
            input.addEventListener("keypress", e => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            })
        })
    }

    initMask() {
        const setCursorPosition = (pos, elem) => {
            if (elem === null) {
                return;
            }
            elem.focus();
            elem.setSelectionRange(pos, pos);
        };

        function createMask(event) {
            let matrix = "+1 (___) ___-____";
            let i = 0;
            const def = matrix.replace(/\D/g, "");
            let val = this.value.replace(/\D/g, "");

            if (def.length >= val.length) {
                val = def
            }

            this.value = matrix.replace(/./g, (a) =>
                /[_\d]/.test(a) && i < val.length
                    ? val.charAt(i++) : i >= val.length ? "" : a
            )

            if (event.type === "blur") {
                if (this.value.length == 2) {
                    this.value = ""
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        const inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach((input) => {
            input.addEventListener("input", createMask);
            input.addEventListener("focus", createMask);
            input.addEventListener("blur", createMask);
        })
    }

    async postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.text()
    }

    init() {
        this.checkMailInputs()
        this.initMask()

        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault()

                let statusMessage = document.createElement('div')
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `
                item.parentNode.appendChild(statusMessage)
                statusMessage.textContent = this.message.loading

                const formData = new FormData(item)
                const jsonData = {}
                formData.forEach((value, key) => {
                    jsonData[key] = value
                })

                this.postData(this.path, jsonData)
                    .then(res => {
                        console.log(res)
                        statusMessage.textContent = this.message.success
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure
                    })
                    .finally(() => {
                        this.clearInputs()

                        setTimeout(() => {
                            statusMessage.remove()
                        }, 2000)
                    })
            })
        })
    }
}
