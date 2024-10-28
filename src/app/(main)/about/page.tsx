import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, MessageSquare, UserPlus, Bot } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <main className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-2xl md:text-4xl">
            About dogdb
          </h1>
          <p className="text-xl text-muted-foreground max-w-prose mx-auto">
            Your ultimate destination for comprehensive dog breed information
            and community engagement.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl sm:text-xl font-semibold text-center">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-center max-w-prose mx-auto">
            At Paw Pals, we&apos;re dedicated to empowering dog lovers with
            knowledge and fostering a vibrant community. Our platform combines
            expert insights, cutting-edge AI technology, and social features to
            provide an unparalleled experience for dog enthusiasts and owners
            alike.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">What We Offer</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <Info className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Comprehensive Breed Information</CardTitle>
              </CardHeader>
              <CardContent>
                Access detailed profiles on a wide range of dog breeds. From
                temperament to grooming needs, health considerations to training
                tips, we provide in-depth information to help you understand and
                care for different breeds.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Bot className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>AI Breed Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                Interact with our advanced AI assistant to get personalized
                information about specific breeds. Ask questions, seek advice,
                and receive tailored recommendations based on your preferences
                and lifestyle.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <UserPlus className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>User Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                Create your personal account to unlock additional features. Save
                favorite breeds, track your research, and personalize your
                experience on Paw Pals. Your account also enables participation
                in our community features.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                Connect with fellow breed owners through our chat feature. Share
                experiences, ask for advice, and build relationships with dog
                lovers who own the same breed as you or breeds you&apos;re
                interested in.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-semibold">Join Our Community</h2>
          <p className="text-lg text-muted-foreground max-w-prose mx-auto">
            Whether you&apos;re a seasoned dog owner or considering getting your
            first furry friend, Paw Pals is here to support you every step of
            the way. Join our growing community of dog enthusiasts and discover
            the perfect breed for your lifestyle.
          </p>
          <Button size="lg" className="mt-4">
            Get Started
          </Button>
        </section>
      </main>
    </div>
  );
}
