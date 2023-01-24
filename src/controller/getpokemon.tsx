import { Pokemon } from '../models/pokemon.m';

export async function getpokemons():Promise<Pokemon[]>{
    const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");
    /* TODO llamado a API REST */
    const datos = await response.json();
    const pokemons = datos.results.map((pokemon:any) => ({
        name: pokemon.name,
        id: pokemon.national_number,
        imggif: CorregirNombre(pokemon.sprites['animated']),
        imgnormal: CorregirNombre(pokemon.sprites['normal']),
        imglarge: CorregirNombre(pokemon.sprites['large']),
        total: pokemon.total,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        sp_atk: pokemon.sp_atk,
        sp_def: pokemon.sp_def,
        speed: pokemon.speed,
        type: pokemon.type[0]
    }));

    const unicosPokemons = pokemons.filter(
        (pokemon: any,index: number)=>
        pokemons.findIndex((other:any)=>other.id == pokemon.id) === index
    );

    return unicosPokemons;    
}


export function CorregirNombre(name: string): string{
    if(name.includes("farfetch'd")){
        return name.replace("farfetch'd","farfetchd");
    }else if(name.includes("mr.-mime")){
        return name.replace("mr.-mime","mr-mime");
    }else if(name.includes("nidoran♂")){
        return name.replace("nidoran♂","nidoran-m");
    }else if(name.includes("nidoran♀")){
        return name.replace("nidoran♀","nidoran-f");
    }
    else{
        return name;
    }
    
}