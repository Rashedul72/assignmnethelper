/**
 * Ambient module fallback for `three`.
 *
 * three.js v0.184 doesn't ship its own TypeScript declarations, so without
 * `@types/three` installed `next build` fails with:
 *   "Could not find a declaration file for module 'three'".
 *
 * `@types/three` is listed in devDependencies; once `npm install` is run,
 * the real declarations from `node_modules/@types/three` take precedence.
 * Until then, this file unblocks the build by typing every value/type we
 * actually use as `any`. It is harmless to keep around — once the real
 * @types are loaded, those provide the precise types and these aliases
 * are only used for namespaces TS can't otherwise resolve.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "three" {
  type _Any = any;

  // ---- Type aliases (used in TYPE positions like `: THREE.Color`) ----
  export type Color = _Any;
  export type Mesh = _Any;
  export type Scene = _Any;
  export type WebGLRenderer = _Any;
  export type PerspectiveCamera = _Any;
  export type OrthographicCamera = _Any;
  export type Clock = _Any;
  export type Vector2 = _Any;
  export type Vector3 = _Any;
  export type Vector4 = _Any;
  export type ShaderMaterial = _Any;
  export type InstancedBufferGeometry = _Any;
  export type InstancedBufferAttribute = _Any;
  export type PlaneGeometry = _Any;
  export type TubeGeometry = _Any;
  export type LineCurve3 = _Any;
  export type Fog = _Any;
  export type LoadingManager = _Any;
  export type Object3D = _Any;
  export type Material = _Any;
  export type BufferGeometry = _Any;
  export type Texture = _Any;
  export type IUniform<T = any> = { value: T };

  // ---- Values (constructors and constants used at runtime) ----
  export const Color: _Any;
  export const Mesh: _Any;
  export const Scene: _Any;
  export const WebGLRenderer: _Any;
  export const PerspectiveCamera: _Any;
  export const OrthographicCamera: _Any;
  export const Clock: _Any;
  export const Vector2: _Any;
  export const Vector3: _Any;
  export const Vector4: _Any;
  export const ShaderMaterial: _Any;
  export const InstancedBufferGeometry: _Any;
  export const InstancedBufferAttribute: _Any;
  export const PlaneGeometry: _Any;
  export const TubeGeometry: _Any;
  export const LineCurve3: _Any;
  export const Fog: _Any;
  export const LoadingManager: _Any;
  export const ShaderChunk: { [key: string]: string };
  export const DoubleSide: _Any;
  export const SRGBColorSpace: _Any;
  export const NoToneMapping: _Any;
  export const MathUtils: {
    clamp(val: number, min: number, max: number): number;
    lerp(start: number, end: number, t: number): number;
    degToRad(degrees: number): number;
    radToDeg(radians: number): number;
    [key: string]: _Any;
  };

  // Catch-all for any other identifier we haven't enumerated.
  const _three: { [key: string]: _Any };
  export default _three;
}
