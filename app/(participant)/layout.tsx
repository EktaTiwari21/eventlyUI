// File: app/(participant)/layout.tsx
import ParticipantNavbar from "@/components/ParticipantNavbar";

export default function ParticipantLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ParticipantNavbar />
            {children}
        </>
    );
}