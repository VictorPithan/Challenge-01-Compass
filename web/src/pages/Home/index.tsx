import { Main } from "./components/Main";
import { Nav } from "./components/Nav";
import { Container } from "./styles";

export function Home() {
  return (
    <Container>
      <Nav />
      <Main />
    </Container>
  )
}