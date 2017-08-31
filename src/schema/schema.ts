
import { SchemaProperty } from './index';


export class Schema {
    /**
     * ID of the schema
     */
    id : string;

    /**
     * Type
     */
    type : string;

    /**
     * Description of the schema
     */
    description : string;

    /**
     * List of properties
     */
    properties : SchemaProperty[];

    /**
     * List of definitions used by this schema
     */
    definitions : Schema[];

    /**
     * Constructor
     */
    constructor(){
        this.properties = [];
        this.definitions = [];
    }

    getId(){
        return this.id;
    }

    setType(type : string){
        this.type = type;
    }

    getType(){
        return this.type;
    }

    getDescription(){
        return this.description;
    }

    addProperty(p : any){
        if(!(p instanceof SchemaProperty)){
            p = new SchemaProperty(p);
        }
        this.properties.push(p);
    }

    getProperties(){
        return this.properties;
    }

    getProperty(name : string){
        let list = this.properties.filter((p : SchemaProperty) => {
            console.log(p);
            if(p.getName() == name){
                return true;
            }
            return false;
        });

        if(list.length > 0){
            return list[0];
        }

        return false;
    }

    getDefinitions(){
        return this.definitions;
    }
}