import { IsAuthorizationType } from '../../types/businessTypes'

export const authSelectors = {
  isLoggedIn: (state: IsAuthorizationType) => state.isLoggedIn,
}
