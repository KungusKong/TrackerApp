export interface monster_full{
    index: string,
    name: string,
    size: string,
    type: string,
    subtype: string,
    alignment: string,
    armor_class: number,
    hit_points: number,
    hit_dice: string,
    forms: {index: string, name: string, url: string},
    speed: object,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    proficiencies: object[],
    damage_vulnerabilities: string[],


}