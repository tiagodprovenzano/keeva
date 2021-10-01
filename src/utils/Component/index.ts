import * as fs from 'fs'
import path from 'path'
import { File } from '../File'

export class Component {
    private name: string
    private dirPath: string
    constructor(name: string, dirPath: string){
        this.name = name
        this.dirPath = dirPath
    }

    create(){
        const defaultTemplatePath = __dirname.replace('utils', 'templates')
        const dir = fs.readdirSync(defaultTemplatePath)
        const targetFolderPath = path.join(this.dirPath, this.name)
        try {
            fs.readdirSync(targetFolderPath)
        } catch (error) {
            
            fs.mkdirSync(targetFolderPath)
        }
        for (const templateFileName of dir) {
            const templatePath = path.join(defaultTemplatePath, templateFileName)
            const templateFn = require(templatePath)
            if(typeof templateFn === 'function'){
                const template = templateFn(this.name)
                const filename = template.filename
                const ext = template.ext
                const content = template.content
                new File(
                    filename,
                    content,
                    targetFolderPath,
                    ext
                ).create()
            }
        }
    }
}