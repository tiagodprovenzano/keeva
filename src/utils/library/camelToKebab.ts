export function camelToKebab(text: string) {
    let newString: string = '';
    for (let index = 0; index < text.length; index++) {
        const element = text[index];
        const regex = new RegExp(/[A-Z]/gm);
        if (element.match(regex)) {
            if (index > 0) {
                newString += '-';
            }
            newString += element.toLocaleLowerCase();
        } else {
            newString += element;
        }
    }
    return newString;
}
