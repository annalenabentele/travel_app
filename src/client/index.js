import { generate } from './js/app'

import './styles/style.scss'

document.getElementById('generate').addEventListener('click', () => generate() )

export {
    generate
}
