type ClassNames =
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

type ParamNames =
    | 'test-size'
    | 'batch-size'
    | 'img-shape'
    | 'learn-rate'
    | 'epochs'
    | 'optim';

export type ResponseModelInfo = {
    status: number;
    name: string;
    date: string;
    params: string;
};

export type ModelData = {
    name: string;
    date: string;
    params: string;
};

export type Classes = {
    // eslint-disable-next-line no-unused-vars
    [x in ClassNames]: string;
};

export type Params = {
    // eslint-disable-next-line no-unused-vars
    [x in ParamNames]: string;
};

export type TrainResults = {
    status: number;
    result: {
        epoch: number;
        iter: number;
        loss: number;
    };
};

export type SocketState = {
    connected: boolean;
    process: 'train' | 'check' | 'done' | undefined;
    results: TrainResults[][];
};
