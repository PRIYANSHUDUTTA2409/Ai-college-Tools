import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" /> Email Us
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Have questions or suggestions? Reach out to our support team.
                        </p>
                        <a href="mailto:support@example.com" className="text-primary hover:underline font-medium">
                            support@example.com
                        </a>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" /> Feedback
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Found a bug or have a feature request? Let us know!
                        </p>
                        <Button variant="outline" className="w-full">
                            Submit Feedback
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
