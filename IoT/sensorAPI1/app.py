import multiprocessing
import logging

# 첫 번째 프로세스로 Vision.py 실행
def run_test2():
    import vision

# 두 번째 프로세스로 environment.py 실행
def run_test1():
    import environment

# Vision 작업에 대한 로그 메시지 추가
logging.debug('Found keypoints in the frame.')

if __name__ == '__main__':
    process1 = multiprocessing.Process(target=run_test2)
    process2 = multiprocessing.Process(target=run_test1)

    process1.start()
    process2.start()

    process1.join()
    process2.join()
