export type TempleRenderer = {
  render(time: number, animate?: boolean): void;
  resize(): void;
  setProgress(progress: number): void;
  setPointer(x: number, y: number, inside?: boolean): void;
  dispose(): void;
  reducedMotion: boolean;
};
export function createTempleNightRenderer(canvas: HTMLCanvasElement): TempleRenderer;
