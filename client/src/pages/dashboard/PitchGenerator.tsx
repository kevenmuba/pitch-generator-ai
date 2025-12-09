import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, RefreshCw, Heart, Phone, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const scenarioConfig: Record<string, { title: string; icon: typeof Heart; color: string }> = {
  dating: { title: "Dating & Social", icon: Heart, color: "from-pink-500/20 to-rose-500/20" },
  "cold-calling": { title: "Cold Calling", icon: Phone, color: "from-neon-cyan/20 to-blue-500/20" },
  business: { title: "Business Pitching", icon: Briefcase, color: "from-neon-purple/20 to-violet-500/20" },
};

const samplePitches = [
  "Hey, I couldn't help but notice your incredible energy from across the room. You seem like someone who appreciates good conversation and maybe a little spontaneity. I'm [Name], and I'd love to buy you a coffee sometime and hear more about what makes you light up like that.",
  "I know this might seem forward, but I believe the best moments in life come from taking chances. I noticed you earlier and felt compelled to say hello. There's something about your presence that's genuinely magnetic. Would you be open to grabbing a drink and seeing where the conversation takes us?",
  "You have this effortless confidence that's really refreshing to see. Most people are so caught up in their phones, but you seem genuinely present. I'm [Name], and I'd regret not at least trying to start a conversation with you.",
];

const PitchGenerator = () => {
  const { scenario, level } = useParams();
  const { toast } = useToast();
  const [confidence, setConfidence] = useState([70]);
  const [formality, setFormality] = useState([30]);
  const [length, setLength] = useState([50]);
  const [humor, setHumor] = useState([40]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);

  const config = scenarioConfig[scenario || "dating"] || scenarioConfig.dating;
  const Icon = config.icon;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedPitch(samplePitches[Math.floor(Math.random() * samplePitches.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    if (generatedPitch) {
      navigator.clipboard.writeText(generatedPitch);
      toast({
        title: "Copied!",
        description: "Pitch copied to clipboard",
      });
    }
  };

  return (
    <UserDashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">{config.title}</h1>
            <Badge variant={level === "advanced" ? "neon" : level === "intermediate" ? "cyan" : "glass"} className="capitalize">
              {level}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Customize Your Pitch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Confidence Level</Label>
                  <span className="text-sm text-muted-foreground">{confidence[0]}%</span>
                </div>
                <Slider
                  value={confidence}
                  onValueChange={setConfidence}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-neon-purple"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Formality</Label>
                  <span className="text-sm text-muted-foreground">{formality[0]}%</span>
                </div>
                <Slider
                  value={formality}
                  onValueChange={setFormality}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-neon-cyan"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Length</Label>
                  <span className="text-sm text-muted-foreground">{length[0]}%</span>
                </div>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-neon-purple"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Humor</Label>
                  <span className="text-sm text-muted-foreground">{humor[0]}%</span>
                </div>
                <Slider
                  value={humor}
                  onValueChange={setHumor}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-neon-cyan"
                />
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Pitch
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Pitch */}
          <Card variant="neon">
            <CardHeader>
              <CardTitle className="text-lg">Generated Pitch</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedPitch ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-foreground leading-relaxed">{generatedPitch}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleGenerate}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Adjust the settings and click generate to create your perfect pitch</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default PitchGenerator;