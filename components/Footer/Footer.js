import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Footer() {
  const router = useRouter();
  return (
    <FooterContainer>
      <Link href="/" passHref>
        <Anchor>
          {router.pathname === "/" ? (
            <Image src="/SVG/homeSelected.svg" height={50} width={50} alt="home nav item" />
          ) : (
            <Image src="/SVG/home.svg" height={50} width={50} alt="home nav item" />
          )}
        </Anchor>
      </Link>
      <Link href="/social" passHref>
        <Anchor>
          {router.pathname === "/social" || router.pathname === `/social/friendtimeline/[userId]` ? (
            <Image src="/SVG/socialSelected.svg" height={50} width={50} alt="social nav item" />
          ) : (
            <Image src="/SVG/social.svg" height={50} width={50} alt="social nav item" />
          )}
        </Anchor>
      </Link>
      <Link href="/profile" passHref>
        <Anchor>
          {router.pathname === "/profile" ? (
            <Image src="/SVG/profileSelected.svg" height={50} width={50} alt="profile nav item" />
          ) : (
            <Image src="/SVG/profile.svg" height={50} width={50} alt="profile nav item" />
          )}
        </Anchor>
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
  margin-top: 15em;
`;

const Anchor = styled.a`
  padding: 0.5em;
  width: 100%;
  text-align: center;
`;
