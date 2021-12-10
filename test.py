import unittest

# class TestSetForOneModule(unittest.TestCase):
#     def test_arithimetic_pass(self):
#         self.assertEqual(2+2, 4)
#     def test_arithimetic_fail(self):
#         self.assertEqual(2+2, 3)
class TestSetForOneModule(unittest.TestCase):
    # def not_a_test(self):
    #     self.assertEqual(10, 12)
    # def test_a_test(self):
    #     self.assertEqual(10, 12)
    # def testa_test(self):
    #     self.assertNotEqual(10, 12)
    # def testFlot(self):
    #     self.assertEqual(12, 12.0)
    # def testBool(self):
    #     self.assertTrue(1)
    #     # self.assertTrue(2==4)
    #     self.assertFalse(2==4)
    def testKnowEqual(self):
        a = 10
        b = a
        # self.assertIs(b, a)
        # b = 12
        # self.assertIs(b, a)
        def mic():
            x = 10
        # self.assertIsNone(mic())
        # self.assertIsNotNone(mic())
        a = [1, 2, 3]
        # self.assertIn(5, a) #assertNotIn
        # self.assertIsInstance(a, int)
# unittest.main(argv=['ignored', '-v'], exit=False)
if __name__ == '__main__':
    unittest.main()