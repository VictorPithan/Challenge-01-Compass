import { Container } from "./styles";

import compassUolIcon from '../../../../assets/compass_uol.svg'

export function Nav() {
  return (
    <Container>
      <img src={compassUolIcon} alt="logo compass uol" />
    </Container>
  )
}