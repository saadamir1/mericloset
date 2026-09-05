import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Chatbot from "../components/chatbot";
import NotificationBar from "../components/NotificationBar";

const Layout = () => {
  // Header hides on scroll-down, reveals on scroll-up (or when back at the
  // very top of the page) — the same pattern mobile browser address bars
  // and most modern site headers use. We deliberately did NOT make it
  // hide/reappear on a timer: content that auto-shows/hides on its own
  // clock reads as a flashing ad, causes a layout jump each time it pops
  // back in, and runs against WCAG 2.2.2 (auto-appearing content needs to
  // be user-controllable). Tying it to scroll direction instead means it
  // only moves when the user is actually doing something, so it never
  // feels random or intrusive.
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const HIDE_THRESHOLD = 80; // don't start hiding until past the very top
    const DELTA = 6; // ignore tiny sub-pixel scroll jitter

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (Math.abs(diff) < DELTA) return;

      if (currentY < HIDE_THRESHOLD) {
        setShowHeader(true);
      } else if (diff > 0) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Flex direction="column" minHeight="100vh">
      {/* NotificationBar and NavBar are wrapped in ONE sticky container so
          they always move as a single unit (see the note history in this
          file's earlier version for why — no more hardcoded top offsets). */}
      <Box
        position="sticky"
        top="0"
        zIndex="30"
        width="100%"
        transform={showHeader ? "translateY(0)" : "translateY(-100%)"}
        transition="transform 0.3s ease"
        willChange="transform"
      >
        <NotificationBar />
        <NavBar />
      </Box>
      <Box flex="1" px={{ base: 3, md: 5 }} pt={{ base: 3, md: 4 }} pb={8} maxW="1600px" w="100%" mx="auto">
        <Outlet />
      </Box>
      <Footer />
      <Chatbot />
    </Flex>
  );
};

export default Layout;