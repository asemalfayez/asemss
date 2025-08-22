import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import SudokuGrid from '@/components/SudokuGrid';
import GameControls from '@/components/GameControls';
import { Sparkles, Brain, Gamepad2 } from 'lucide-react';

const Index = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [timer, setTimer] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // Start game on first interaction
  useEffect(() => {
    if (!gameStarted && (timer > 0 || errors > 0)) {
      setGameStarted(true);
    }
  }, [timer, errors, gameStarted]);

  const handleReset = () => {
    setTimer(0);
    setErrors(0);
    setGameStarted(false);
    toast.info('تم إعادة تعيين اللعبة');
  };

  const handleHint = () => {
    toast.info('💡 ابحث عن الأرقام المفقودة في كل صف وعمود!');
  };

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setTimer(0);
    setErrors(0);
    setGameStarted(false);
    toast.info('تم تغيير المستوى');
  };

  return (
    <div className="min-h-screen py-4 px-2 sm:px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sudoku Color Play
            </h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
          </div>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto px-2">
            تحدِ عقلك مع لعبة السودوكو الكلاسيكية وتحدي تلوين الرسم البياني في تجربة واحدة مميزة
          </p>
        </div>

        {/* Game Controls */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onReset={handleReset}
          onHint={handleHint}
          timer={timer}
          errors={errors}
        />

        {/* Game Area */}
        <div className="max-w-md mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-primary flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8" />
            السودوكو الملون
            <Brain className="w-6 h-6 sm:w-8 sm:h-8" />
          </h2>
          <SudokuGrid
            difficulty={difficulty}
            setErrorCount={setErrors}
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 sm:mt-12 game-card p-4 sm:p-6 text-center max-w-md mx-auto">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-primary">كيفية اللعب</h3>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">🧩 السودوكو الملون</h4>
              <p>1. انقر على خانة فارغة في شبكة السودوكو</p>
              <p>2. اختر الرقم المناسب من الأرقام الملونة أسفل الشبكة</p>
              <p>3. كل خانة لها رقم واحد صحيح فقط</p>
              <p>4. كل رقم له لون مميز لسهولة التمييز البصري</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;