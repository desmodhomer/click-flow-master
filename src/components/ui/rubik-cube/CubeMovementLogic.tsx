
import { useEffect, useCallback } from "react";
import { Move } from "./types";
import { generatePossibleMoves, selectNextMove } from "./moveGenerator";

interface CubeMovementLogicProps {
  isVisible: boolean;
  isMountedRef: React.MutableRefObject<boolean>;
  isResizingRef: React.MutableRefObject<boolean>;
  isAnimatingRef: React.MutableRefObject<boolean>;
  lastMoveAxisRef: React.MutableRefObject<string | null>;
  setCurrentMove: (move: Move | null) => void;
}

export const useCubeMovementLogic = ({
  isVisible,
  isMountedRef,
  isResizingRef,
  isAnimatingRef,
  lastMoveAxisRef,
  setCurrentMove
}: CubeMovementLogicProps) => {
  const ANIMATION_DURATION = 1.2;
  const possibleMoves = generatePossibleMoves();

  const selectNextMoveHandler = useCallback(() => {
    if (!isAnimatingRef.current && isVisible && isMountedRef.current && !isResizingRef.current) {
      const move = selectNextMove(possibleMoves, lastMoveAxisRef.current);
      setCurrentMove(move);
      lastMoveAxisRef.current = move.axis;
    }
  }, [possibleMoves, isVisible, isAnimatingRef, isMountedRef, isResizingRef, lastMoveAxisRef, setCurrentMove]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextMove = () => {
      if (isVisible && isMountedRef.current && !isResizingRef.current) {
        const delay = isAnimatingRef.current ? ANIMATION_DURATION * 1000 : 200;
        
        timeoutId = setTimeout(
          () => {
            selectNextMoveHandler();
            if (isMountedRef.current) {
              scheduleNextMove();
            }
          },
          delay
        );
      } else {
        if (isResizingRef.current && isVisible && isMountedRef.current) {
          setTimeout(() => {
            if (isMountedRef.current) {
              scheduleNextMove();
            }
          }, 500);
        }
      }
    };

    scheduleNextMove();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, selectNextMoveHandler, isMountedRef, isResizingRef, isAnimatingRef]);

  return {
    selectNextMoveHandler
  };
};
