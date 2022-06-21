export interface Data {
    label: string;
    value?: number;
    color: string;
    count?: number;
}

export interface PieOptions {
    pieSize?: number;
    radiusWidth?: number;
    cornerRadius?: number;
    padAngle?: number;
}

export interface Props {
    data: Data[];
    options: PieOptions;
}
