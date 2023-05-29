import { Container } from "./styles";

import compassUolIcon from '../../../../assets/compass_uol.svg'
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../contexts/DataContext";
import { NotePencil, SignOut } from "phosphor-react";
import api from "../../../../services/api";

type User = {
  id: string;
  name: string;
  username: string;
  birthDate: string;
  email: string;
  profilePhoto: string | null;
}

export function Nav() {
  const [userlogged, setUserlogged] = useState<User | null>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.get('/users/profile')
        const data: User = responseData.data
        setUserlogged({
            id: data.id,
            name: data.name,
            username: data.username,
            birthDate: data.birthDate,
            email: data.email,
            profilePhoto: data.profilePhoto
        })

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);
  const customRoute = `/edit-profile/${userlogged?.id}`
  const { logout } = useContext(DataContext)
  async function handleLogout() {
    logout()
  }
  return (
    <Container>
      <img src={compassUolIcon} alt="logo compass uol" />
      <a href={customRoute}>
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