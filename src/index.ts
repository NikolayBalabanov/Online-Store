import './global.css'
import { Router } from "./router/router";

import { Header } from "./components/Header/header";

const header = new Header()
document.body.append(header.createLayout())

Router()
