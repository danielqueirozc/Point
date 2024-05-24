interface PointProps {
    x: number;
    y: number;
}

export function Point({ x, y }: PointProps) {
    return (
        <div className="w-8 h-8 bg-white/50 rounded-full absolute" style={{left: x, top: y}}>
            
        </div>
    );
}