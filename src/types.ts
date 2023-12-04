type classes =
    | 'cane'
    | 'cavallo'
    | 'elefante'
    | 'farfalla'
    | 'gallina'
    | 'gatto'
    | 'mucca'
    | 'pecora'
    | 'scoiattolo'
    | 'ragno';

export type ModelData = {
    name: string;
    date: string;
    params: string;
};

export type Classes = {
    // eslint-disable-next-line no-unused-vars
    [x in classes]: string;
};
