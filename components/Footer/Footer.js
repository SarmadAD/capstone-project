import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Footer({}) {
  const router = useRouter();
  return (
    <FooterContainer>
      <Link href="/" passHref>
        <Ancher>
          {router.pathname === "/" ? (
            <Image src="/SVG/homeSelected.svg" height={50} width={50} alt="home nav item" />
          ) : (
            <Image src="/SVG/home.svg" height={50} width={50} alt="home nav item" />
          )}
        </Ancher>
      </Link>
      <Link href="/social" passHref>
        <Ancher>
          {router.pathname === "/social" ? (
            <Image src="/SVG/socialSelected.svg" height={50} width={50} alt="social nav item" />
          ) : (
            <Image src="/SVG/social.svg" height={50} width={50} alt="social nav item" />
          )}
        </Ancher>
      </Link>
      <Link href="/profile" passHref>
        <Ancher>
          {router.pathname === "/profile" ? (
            <Image src="/SVG/profileSelected.svg" height={50} width={50} alt="profile nav item" />
          ) : (
            <Image src="/SVG/profile.svg" height={50} width={50} alt="profile nav item" />
          )}
        </Ancher>
      </Link>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  bottom: 0;
  right: 0;
  left: 0;
  background: #9e94d6;
`;

const Ancher = styled.a`
  border: 1px solid #000000;
  padding: 0.5em;
  width: 100%;
  text-align: center;
`;
