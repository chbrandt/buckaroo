import unittest

from buckaroo.pluggable_analysis_framework.pluggable_analysis_framework import (
    ColAnalysis)

from buckaroo.pluggable_analysis_framework.analysis_management import (
    AnalsysisPipeline, NonExistentSummaryRowException, DfStats,
    produce_summary_df, full_produce_summary_df, produce_series_df)


from buckaroo.customizations.analysis import (TypingStats, DefaultSummaryStats)
from .fixtures import (test_df, df, DistinctCount, Len, DistinctPer, word_only_df)

class DumbTableHints(ColAnalysis):
    provides_summary = [
        'is_numeric', 'is_integer', 'min_digits', 'max_digits', 'histogram']

    @staticmethod
    def computed_summary(summary_dict):
        return {'is_numeric':True,
                'is_integer':False,
                'min_digits':3,
                'max_digits':10,
                'histogram': []}


class TestAnalysisPipeline(unittest.TestCase):

    def test_produce_series_df(self):
        """just make sure this doesn't fail"""

        sdf, errs = produce_series_df(
            test_df, [Len], 'test_df', debug=True)
        ld = {'len':4}
        assert sdf == {'normal_int_series': ld, 'empty_na_ser': ld, 'float_nan_ser': ld}

        sdf2, errs = produce_series_df(
            test_df, [DistinctCount], 'test_df', debug=True)
        assert sdf2 == {'normal_int_series': {'distinct_count': 4},
                        'empty_na_ser': {'distinct_count':0}, 'float_nan_ser': {'distinct_count':2}}

        sdf3, errs = produce_series_df(
            test_df, [DistinctCount, DistinctPer], 'test_df', debug=True)
        assert sdf3 == {'normal_int_series': {'distinct_count': 4},
                        'empty_na_ser': {'distinct_count':0}, 'float_nan_ser': {'distinct_count':2}}

    def test_produce_summary_df(self):
        """just make sure this doesn't fail"""
        empty_summary_dict = {'normal_int_series':{}, 'empty_na_ser': {}, 'float_nan_ser': {}}
        sdf, th, errs = full_produce_summary_df(
            test_df, [DistinctCount, Len, DistinctPer], 'test_df', debug=True)
        assert errs == {}

    def test_produce_summary_df_hints(self):
        #this test should be ported over to the full basic_widget test with actaul verificaiton of values
        
        summary_df, hints, errs = full_produce_summary_df(
            test_df, [DumbTableHints], 'test_df')

        for col, hint_obj in hints.items():
            #hacky replication of typescript types, just basically testing that hints are constructed properly
            if hint_obj['is_numeric'] is False:
                assert 'histogram' in hint_obj.keys()
            else:
                expected_set = set(
                    ['is_numeric', 'is_integer', 'min_digits', 'max_digits', 'type', 'formatter', 'histogram'])
                assert expected_set == set(hint_obj.keys())

    def test_pipeline_base(self):
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        #just verify that there are no errors
        ap.process_df(df)

    def test_add_aobj(self):
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        class Foo(ColAnalysis):
            provides_summary = ['foo']
            requires_summary = ['length']

            @staticmethod
            def computed_summary(summary):
                return dict(foo=8)
        assert ap.add_analysis(Foo) == (True, []) #verify no errors thrown
        sdf, _unused, _unused_errs = ap.process_df(df)
        self.assertEqual(sdf['tripduration']['foo'], 8)

    def test_add_buggy_aobj(self):
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        class Foo(ColAnalysis):
            provides_summary = ['foo']
            requires_summary = ['length']

            @staticmethod
            def computed_summary(summary_dict):
                1/0 #throw an error
                return dict(foo=8)
        unit_test_results, errs = ap.add_analysis(Foo)
        
        assert unit_test_results is False

    def test_replace_aobj(self):
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        class Foo(ColAnalysis):
            provides_summary = ['foo']
            requires_summary = ['length']

            @staticmethod
            def computed_summary(bar):
                return dict(foo=8)
        ap.add_analysis(Foo)
        sdf, _unused, _unused_errs = ap.process_df(df)
        self.assertEqual(sdf['tripduration']['foo'], 8)
        #18 facts returned about tripduration
        #FIXME
        #self.assertEqual(len(sdf['tripduration']), 18)
        #Create an updated Foo that returns 9
        class Foo(ColAnalysis):
            provides_summary = ['foo']
            requires_summary = ['length']

            @staticmethod
            def computed_summary(bar):
                return dict(foo=9)
        ap.add_analysis(Foo)
        sdf2, _unused, _unused_errs = ap.process_df(df)
        self.assertEqual(sdf2['tripduration']['foo'], 9)
        #still 18 facts returned about tripduration
        #self.assertEqual(len(sdf2['tripduration']), 18)
        #Create an updated Foo that returns 9

    def xtest_summary_stats_display(self):
        ap = AnalsysisPipeline([TypingStats])
        self.assertEqual(ap.summary_stats_display, "all")
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        print(ap.summary_stats_display)
        self.assertTrue("dtype" in ap.summary_stats_display)

    def xtest_add_summary_stats_display(self):
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        class Foo(ColAnalysis):
            provides_summary = ['foo']
            requires_summary = ['length']
            summary_stats_display = ['foo']

        ap.add_analysis(Foo)
        self.assertEquals(ap.summary_stats_display, ['foo'])

    def xtest_invalid_summary_stats_display_throws(self):
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        class Foo(ColAnalysis):
            provides_summary = ['foo']
            requires_summary = ['length']
            summary_stats_display = ['not_provided']

        def bad_add():
            ap.add_analysis(Foo)            

        self.assertRaises(NonExistentSummaryRowException, bad_add)

    def xtest_invalid_summary_stats_display_throws2(self):
        ap = AnalsysisPipeline([TypingStats, DefaultSummaryStats])
        class Foo(ColAnalysis):
            provides_summary = ['foo']
            requires_summary = ['length']
            summary_stats_display = ['not_provided']

        def bad_add():
            ap.add_analysis(Foo)            

        self.assertRaises(NonExistentSummaryRowException, bad_add)



class SometimesProvides(ColAnalysis):
    provides_summary = ['conditional_on_dtype']

    summary_stats_display = ['conditional_on_dtype']
    
    @staticmethod
    def summary(sampled_ser, summary_ser, ser):
        import pandas as pd
        is_numeric = pd.api.types.is_numeric_dtype(ser)
        if is_numeric:
            return dict(conditional_on_dtype=True)
        return {}

class xTestDfStats(unittest.TestCase):
    def xtest_dfstats_sometimes_present(self):
        """many ColAnalysis objects are written such that they only
        provide stats for certain dtypes. This used to cause
        instantiation failures. This test verifies that there are no
        stack traces. The alternative would be to have ColAnalyis
        objects always return every key, even if NA. That's a less
        natural style to write analyis code.

        Possible future improvement is to run through PERVERSE_DF and
        verify that each ColAnalyis provides its specified value as
        non NA at least once

        """
        #dfs = DfStats(word_only_df, [SometimesProvides])
        #ab = dfs.presentation_sdf

        #triggers a getter?
        DfStats(word_only_df, [SometimesProvides]).presentation_sdf


