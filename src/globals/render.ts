export function render(element: any, target: any) {
    if(typeof target === 'undefined') {
        target = document.body
    }
    target.innerHTML = ''
    target.appendChild(element)
    return target
}