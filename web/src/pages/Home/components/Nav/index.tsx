import { Container } from "./styles";

import compassUolIcon from '../../../../assets/compass_uol.svg'
import { useContext } from "react";
import { DataContext } from "../../../../contexts/DataContext";
import { NotePencil, SignOut } from "phosphor-react";

export function Nav() {
  const { logout } = useContext(DataContext)
  async function handleLogout() {
    logout()
  }
  return (
    <Container>
      <img src={compassUolIcon} alt="logo compass uol" />
      <a href="/edit-profile">
        <NotePencil size={20} />
        Editar Perfil
      </a>
      <button onClick={handleLogout}>
        <SignOut size={20} />
        Logout
      </button>
    </Container>
  )
}