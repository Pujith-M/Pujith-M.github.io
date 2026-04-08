import { Billboard } from '@react-three/drei'

/**
 * SmartBillboard ensures that content always faces the camera,
 * preventing mirrored text or invisible backfaces when the camera orbits.
 */
export const SmartBillboard = ({ children, ...props }) => {
  return (
    <Billboard
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
      {...props}
    >
      {children}
    </Billboard>
  )
}
