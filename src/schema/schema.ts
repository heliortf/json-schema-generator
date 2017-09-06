
import { SchemaProperty } from "./index";

export class Schema {
    /**
     * ID of the schema
     */
    public id: string;

    /**
     * Type
     */
    public type: string;

    /**
     * Description of the schema
     */
    public description: string;

    /**
     * List of properties
     */
    public properties: SchemaProperty[];

    /**
     * List of definitions used by this schema
     */
    public definitions: Schema[];

    /**
     * Constructor
     */
    constructor(params?: any){
        this.description = "";
        this.type = "object";
        this.id = "";
        this.properties = [];
        this.definitions = [];

        this.setValues(params);
    }

    public setValues(params: any){
        const self = this;

        if (typeof params == "object"){
            if (typeof params.type == "string" && params.type != ""){
                this.setType(params.type);
            }

            if (typeof params.id == "string" && params.id != ""){
                this.setId(params.id);
            }

            if (typeof params.properties == "object" && Object.keys(params.properties).length > 0){
                const keys = Object.keys(params.properties);

                const properties = keys.forEach((key: string) => {
                    self.addProperty(params.properties[key]);
                });
            }
        }
    }

    public setId(id: string){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setType(type: string){
        this.type = type;
    }

    public getType(){
        return this.type;
    }

    public setDescription(description: string){
        this.description = description;
    }

    public getDescription(){
        return this.description;
    }

    public addProperty(p: any){
        if (!(p instanceof SchemaProperty)){
            p = new SchemaProperty(p);
        }
        this.properties.push(p);
    }

    public getProperties(){
        return this.properties;
    }

    public getProperty(name: string){
        const list = this.properties.filter((p: SchemaProperty) => {
            if (p.getName() == name){
                return true;
            }
            return false;
        });

        if (list.length > 0){
            return list[0];
        }

        return false;
    }

    public addDefinition(definition: Schema){
        this.definitions.push(definition);
    }

    public getDefinitions(){
        return this.definitions;
    }
}
